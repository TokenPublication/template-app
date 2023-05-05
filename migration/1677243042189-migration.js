const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class migration1677243042189 {
    name = 'migration1677243042189'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "dev_template_app"."city" ("id" BIGSERIAL NOT NULL, "name" text NOT NULL, "code" smallint, "country_id" bigint NOT NULL, "countryId" bigint, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."city_subdivision" ("id" BIGSERIAL NOT NULL, "name" text NOT NULL, "city_id" bigint NOT NULL, "cityId" bigint, CONSTRAINT "PK_13ef9f22b0c565ce44cc74c183d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."country" ("id" BIGSERIAL NOT NULL, "name" text NOT NULL, "code" text NOT NULL, CONSTRAINT "UNQ_COUNTRY_NAME" UNIQUE ("name"), CONSTRAINT "UNQ_COUNTRY_CODE" UNIQUE ("code"), CONSTRAINT "UNQ_COUNTRY_NAME" UNIQUE ("name"), CONSTRAINT "UNQ_COUNTRY_CODE" UNIQUE ("code"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."init" ("id" SERIAL NOT NULL, "timestamp" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_8d5fa6521b9ea090df1f6f541f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "dev_template_app"."order_delivery_type_enum" AS ENUM('delivery', 'pickup')`);
        await queryRunner.query(`CREATE TYPE "dev_template_app"."order_payment_type_enum" AS ENUM('web', 'branch')`);
        await queryRunner.query(`CREATE TYPE "dev_template_app"."order_status_enum" AS ENUM('pending', 'in_progress', 'completed', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."order" ("id" uuid NOT NULL, "delivery_type" "dev_template_app"."order_delivery_type_enum" NOT NULL DEFAULT 'pickup', "payment_type" "dev_template_app"."order_payment_type_enum" NOT NULL DEFAULT 'web', "status" "dev_template_app"."order_status_enum" NOT NULL DEFAULT 'pending', "branch_id" text NOT NULL, "customer_id" uuid, "table_id" uuid, "total" integer NOT NULL, "total_payable" integer NOT NULL, "basket_no" integer, "title" text, "created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, CONSTRAINT "UNQ_ORDER_ID" UNIQUE ("id"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ORDER_ID" ON "dev_template_app"."order" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ORDER_BRANCH_ID" ON "dev_template_app"."order" ("branch_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ORDER_CUSTOMER_ID" ON "dev_template_app"."order" ("customer_id") `);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" double precision NOT NULL, "discount" double precision DEFAULT '0', "order_id" uuid NOT NULL, "product_id" uuid NOT NULL, "created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "orderId" uuid, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ORDER_ITEM_ORDER_ID" ON "dev_template_app"."order_item" ("order_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ORDER_ITEM_PRODUCT_ID" ON "dev_template_app"."order_item" ("product_id") `);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."branch" ("id" text NOT NULL, "name" text NOT NULL, "status" smallint DEFAULT '0', "terminal_id" text NOT NULL, "created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, CONSTRAINT "branch_name" UNIQUE ("name"), CONSTRAINT "branch_terminal_id" UNIQUE ("terminal_id"), CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_BRANCH_NAME" ON "dev_template_app"."branch" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_BRANCH_TERMINAL_ID" ON "dev_template_app"."branch" ("terminal_id") `);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."customer_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" text NOT NULL, "name" text NOT NULL, "customer_id" uuid NOT NULL, "citysubdivision_id" uuid NOT NULL, "city_id" uuid NOT NULL, "country_id" uuid NOT NULL, "created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "customerId" uuid, "cityId" bigint, "citysubdivisionId" bigint, "countryId" bigint, CONSTRAINT "UQ_23810fb397050d8ac37dae44ff6" UNIQUE ("id"), CONSTRAINT "customer_address_name" UNIQUE ("name"), CONSTRAINT "PK_23810fb397050d8ac37dae44ff6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_CUSTOMER_ADDRESS_ID" ON "dev_template_app"."customer_address" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_CUSTOMER_ADDRESS_NAME" ON "dev_template_app"."customer_address" ("name") `);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "surname" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "id_number" text NOT NULL, "password" text NOT NULL, "created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, CONSTRAINT "customer_email" UNIQUE ("email"), CONSTRAINT "customer_phone" UNIQUE ("phone"), CONSTRAINT "customer_id_number" UNIQUE ("id_number"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_CUSTOMER_EMAIL" ON "dev_template_app"."customer" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_CUSTOMER_PHONE" ON "dev_template_app"."customer" ("phone") `);
        await queryRunner.query(`CREATE INDEX "IDX_CUSTOMER_ID_NUMBER" ON "dev_template_app"."customer" ("id_number") `);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."merchant" ("id" text NOT NULL, "name" text NOT NULL, "company_name" text NOT NULL, "email" text NOT NULL, "status" smallint DEFAULT '0', "nace" text, "created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, CONSTRAINT "UNQ_MERCHANT_NAME" UNIQUE ("name"), CONSTRAINT "UNQ_MERCHANT_ID" UNIQUE ("id"), CONSTRAINT "PK_9a3850e0537d869734fc9bff5d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_MERCHANT_NAME" ON "dev_template_app"."merchant" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_MERCHANT_ID" ON "dev_template_app"."merchant" ("id") `);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."section" ("id" uuid NOT NULL, "name" text NOT NULL, "status" smallint, "branch_id" text NOT NULL, "created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "branchId" text, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."table" ("id" uuid NOT NULL, "name" text NOT NULL, "type" integer NOT NULL DEFAULT '0', "x_coordinate" double precision NOT NULL DEFAULT '0', "y_coordinate" double precision NOT NULL DEFAULT '0', "section_id" text NOT NULL, "sectionId" uuid, CONSTRAINT "PK_28914b55c485fc2d7a101b1b2a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."terminal_branch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "terminal_id" text NOT NULL, "branch_id" text NOT NULL, "created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, CONSTRAINT "PK_bf515b3af61e40eb2b4c648bb3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."category" ("id" uuid NOT NULL, "name" text NOT NULL, "image_url" text, "status" text NOT NULL DEFAULT '0', "priority" smallint DEFAULT '0', "code" smallint, "created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_CATEGORY_ID" ON "dev_template_app"."category" ("id") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_CATEGORY_NAME" ON "dev_template_app"."category" ("name") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."merchant_tax" ("id" text NOT NULL, "amount" integer NOT NULL, "status" smallint NOT NULL, CONSTRAINT "PK_949d86ace42f002f717a1dd00b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."product" ("id" uuid NOT NULL, "name" text NOT NULL, "barcode" text NOT NULL, "image_url" text NOT NULL, "amount" integer DEFAULT '0', "priority" smallint DEFAULT '0', "merchant_tax_id" text NOT NULL, "is_for_all_branches" boolean DEFAULT true, "is_sector" boolean DEFAULT false, "description" text, "quantity_type_code" text NOT NULL DEFAULT 'C62', "quantity_type_name" text NOT NULL, "quantity_type_abbreviation" text NOT NULL, "status" smallint DEFAULT '0', "created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "merchantTaxId" text, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_PRODUCT_BARCODE" ON "dev_template_app"."product" ("barcode") `);
        await queryRunner.query(`CREATE INDEX "IDX_PRODUCT_NAME" ON "dev_template_app"."product" ("name") `);
        await queryRunner.query(`CREATE TABLE "dev_template_app"."product_category" ("productId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_7e60cbb6e911363b5ff8ed28e85" PRIMARY KEY ("productId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_930110e92aed1778939fdbdb30" ON "dev_template_app"."product_category" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_559e1bc4d01ef1e56d75117ab9" ON "dev_template_app"."product_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."city" ADD CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0" FOREIGN KEY ("countryId") REFERENCES "dev_template_app"."country"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."city_subdivision" ADD CONSTRAINT "FK_2b9c0b6f62ec40fffcff4d64993" FOREIGN KEY ("cityId") REFERENCES "dev_template_app"."city"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."order" ADD CONSTRAINT "FK_bffc1bebf6db72c49d80df64b24" FOREIGN KEY ("branch_id") REFERENCES "dev_template_app"."branch"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."order" ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "dev_template_app"."customer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "dev_template_app"."order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."order_item" ADD CONSTRAINT "FK_5e17c017aa3f5164cb2da5b1c6b" FOREIGN KEY ("product_id") REFERENCES "dev_template_app"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."customer_address" ADD CONSTRAINT "FK_af004ad3c5bf7e3096f5d40190f" FOREIGN KEY ("customerId") REFERENCES "dev_template_app"."customer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."customer_address" ADD CONSTRAINT "FK_331e1fda2f9d8fbe06773469563" FOREIGN KEY ("cityId") REFERENCES "dev_template_app"."city"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."customer_address" ADD CONSTRAINT "FK_9d84daa0b14f336259849ac7220" FOREIGN KEY ("citysubdivisionId") REFERENCES "dev_template_app"."city_subdivision"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."customer_address" ADD CONSTRAINT "FK_65519097bd64443c61044267030" FOREIGN KEY ("countryId") REFERENCES "dev_template_app"."country"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."section" ADD CONSTRAINT "FK_41cdad896b5304cdbb71dd67a16" FOREIGN KEY ("branchId") REFERENCES "dev_template_app"."branch"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."table" ADD CONSTRAINT "FK_e67fe6dcc41eeeded3bd79bf388" FOREIGN KEY ("sectionId") REFERENCES "dev_template_app"."section"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."product" ADD CONSTRAINT "FK_3acf299db407b1e36361cb7b4ae" FOREIGN KEY ("merchantTaxId") REFERENCES "dev_template_app"."merchant_tax"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."product_category" ADD CONSTRAINT "FK_930110e92aed1778939fdbdb302" FOREIGN KEY ("productId") REFERENCES "dev_template_app"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."product_category" ADD CONSTRAINT "FK_559e1bc4d01ef1e56d75117ab9c" FOREIGN KEY ("categoryId") REFERENCES "dev_template_app"."category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "dev_template_app"."product_category" DROP CONSTRAINT "FK_559e1bc4d01ef1e56d75117ab9c"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."product_category" DROP CONSTRAINT "FK_930110e92aed1778939fdbdb302"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."product" DROP CONSTRAINT "FK_3acf299db407b1e36361cb7b4ae"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."table" DROP CONSTRAINT "FK_e67fe6dcc41eeeded3bd79bf388"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."section" DROP CONSTRAINT "FK_41cdad896b5304cdbb71dd67a16"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."customer_address" DROP CONSTRAINT "FK_65519097bd64443c61044267030"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."customer_address" DROP CONSTRAINT "FK_9d84daa0b14f336259849ac7220"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."customer_address" DROP CONSTRAINT "FK_331e1fda2f9d8fbe06773469563"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."customer_address" DROP CONSTRAINT "FK_af004ad3c5bf7e3096f5d40190f"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."order_item" DROP CONSTRAINT "FK_5e17c017aa3f5164cb2da5b1c6b"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."order" DROP CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."order" DROP CONSTRAINT "FK_bffc1bebf6db72c49d80df64b24"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."city_subdivision" DROP CONSTRAINT "FK_2b9c0b6f62ec40fffcff4d64993"`);
        await queryRunner.query(`ALTER TABLE "dev_template_app"."city" DROP CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_559e1bc4d01ef1e56d75117ab9"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_930110e92aed1778939fdbdb30"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."product_category"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_PRODUCT_NAME"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_PRODUCT_BARCODE"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."product"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."merchant_tax"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_CATEGORY_NAME"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_CATEGORY_ID"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."category"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."terminal_branch"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."table"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."section"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_MERCHANT_ID"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_MERCHANT_NAME"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."merchant"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_CUSTOMER_ID_NUMBER"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_CUSTOMER_PHONE"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_CUSTOMER_EMAIL"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."customer"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_CUSTOMER_ADDRESS_NAME"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_CUSTOMER_ADDRESS_ID"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."customer_address"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_BRANCH_TERMINAL_ID"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_BRANCH_NAME"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."branch"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_ORDER_ITEM_PRODUCT_ID"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_ORDER_ITEM_ORDER_ID"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."order_item"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_ORDER_CUSTOMER_ID"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_ORDER_BRANCH_ID"`);
        await queryRunner.query(`DROP INDEX "dev_template_app"."IDX_ORDER_ID"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."order"`);
        await queryRunner.query(`DROP TYPE "dev_template_app"."order_status_enum"`);
        await queryRunner.query(`DROP TYPE "dev_template_app"."order_payment_type_enum"`);
        await queryRunner.query(`DROP TYPE "dev_template_app"."order_delivery_type_enum"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."init"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."country"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."city_subdivision"`);
        await queryRunner.query(`DROP TABLE "dev_template_app"."city"`);
    }
}
