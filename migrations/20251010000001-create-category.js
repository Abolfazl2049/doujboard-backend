/** @type {import('sequelize-cli').Migration} */
const migration = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Categories", {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      user: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      name: {
        type: Sequelize.STRING(12)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add index for foreign key if it doesn't exist
    try {
      await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS "categories_user" ON "Categories" ("user");');
    } catch (error) {
      console.log("Index might already exist:", error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Drop any foreign key constraints first
      await queryInterface.sequelize.query('ALTER TABLE IF EXISTS "DoujCategories" DROP CONSTRAINT IF EXISTS "DoujCategories_categoryId_fkey";');

      await queryInterface.dropTable("Categories");
    } catch (error) {
      console.log("Error in down migration:", error.message);
    }
  }
};

export default migration;
