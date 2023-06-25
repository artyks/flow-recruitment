import {
  FormQuestionVisibilityRulesService,
  FormQuestionsService,
  FormsService,
} from '@flow-recruitment/forms/services';

import { ProductCategoriesService } from '@flow-recruitment/product-categories/services';
import {
  CarDealPurchaseConfig,
  CarDealSearchConfig,
  VehicleInsurancePurchaseConfig,
  VehicleInsuranceSearchConfig,
  callWithInjectedPrismaTransaction,
  userFixture,
} from '@flow-recruitment/prisma/utilities';
import { PrismaClientService } from '@flow-recruitment/prisma/client';
import { Logger } from '@nestjs/common';

const prisma = new PrismaClientService();

const seedDb = async () => {
  await prisma.$connect();

  return await prisma.$transaction(
    async (tx) => {
      /**
       * Seed user
       * Note: seeding user directly to set mock userId
       */
      await tx.user.create({
        data: { ...userFixture },
      });

      /**
       * Init form services
       */
      const formQuestionVisibilityRulesService = new FormQuestionVisibilityRulesService(prisma);
      const formQuestionsService = new FormQuestionsService(prisma, formQuestionVisibilityRulesService);
      const formsService = new FormsService(prisma, formQuestionsService);

      /**
       * Init product category service
       */
      const productCategoryService = new ProductCategoriesService(prisma);

      /**
       * Seed VehicleInsuranceSearch form
       */
      const vehicleInsuranceSearchFormPromise = callWithInjectedPrismaTransaction({
        tx,
        service: formsService,
        method: 'createOne',
        args: [{ questions: VehicleInsuranceSearchConfig }],
      });

      /**
       * Seed VehicleInsurancePurchase form
       */
      const vehicleInsurancePurchaseFormPromise = callWithInjectedPrismaTransaction({
        tx,
        service: formsService,
        method: 'createOne',
        args: [{ questions: VehicleInsurancePurchaseConfig }],
      });

      /**
       * Seed CarDealSearch form
       */
      const carDealSearchFormPromise = callWithInjectedPrismaTransaction({
        tx,
        service: formsService,
        method: 'createOne',
        args: [{ questions: CarDealSearchConfig }],
      });

      /**
       * Seed CarDealPurchase form
       */
      const carDealPurchaseFormPromise = callWithInjectedPrismaTransaction({
        tx,
        service: formsService,
        method: 'createOne',
        args: [{ questions: CarDealPurchaseConfig }],
      });

      const [vehicleInsuranceSearchForm, vehicleInsurancePurchaseForm, carDealSearchForm, carDealPurchaseForm] =
        await Promise.all([
          vehicleInsuranceSearchFormPromise,
          vehicleInsurancePurchaseFormPromise,
          carDealSearchFormPromise,
          carDealPurchaseFormPromise,
        ]);

      /**
       * Seed VehicleInsuranceOffers product category
       */
      const vehicleInsuranceProductCategoryPromise = callWithInjectedPrismaTransaction({
        tx,
        service: productCategoryService,
        method: 'createOne',
        args: [
          {
            name: 'Vehicle insurance',
            formPurchaseId: vehicleInsurancePurchaseForm.id,
            formSearchId: vehicleInsuranceSearchForm.id,
          },
        ],
      });

      /**
       * Seed CarDeals product category
       */
      const carDealsProductCategoryPromise = callWithInjectedPrismaTransaction({
        tx,
        service: productCategoryService,
        method: 'createOne',
        args: [
          {
            name: 'Car deals',
            formPurchaseId: carDealPurchaseForm.id,
            formSearchId: carDealSearchForm.id,
          },
        ],
      });

      await Promise.all([vehicleInsuranceProductCategoryPromise, carDealsProductCategoryPromise]);
    },
    {
      maxWait: 10000, // default: 2000
      timeout: 10000, // default: 5000
    },
  );
};

seedDb()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    Logger.log('Seed successfully finished :)');
    await prisma.$disconnect();
  });
