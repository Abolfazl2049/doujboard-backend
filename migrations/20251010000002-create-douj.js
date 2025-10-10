/** @type {import('sequelize-cli').Migration} */
const migration = {
  async up(queryInterface, Sequelize) {
    // Check if enum exists first
    try {
      await queryInterface.sequelize.query("CREATE TYPE \"enum_Doujs_visibility\" AS ENUM ('private', 'public');");
    } catch (error) {
      // If error is not about enum already existing, throw it
      if (!error.message.includes("already exists")) {
        throw error;
      }
      // If enum exists, we can proceed
      console.log("Enum type already exists, skipping creation");
    }

    await queryInterface.createTable("Doujs", {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      category: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
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
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      img: {
        type: Sequelize.STRING
      },
      hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      link: {
        type: Sequelize.STRING
      },
      visibility: {
        type: "enum_Doujs_visibility",
        allowNull: false,
        defaultValue: "private"
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: []
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

    // Add indexes for foreign keys and frequently queried fields if they don't exist
    try {
      await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS "doujs_category" ON "Doujs" ("category");');
      await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS "doujs_user" ON "Doujs" ("user");');
      await queryInterface.sequelize.query('CREATE INDEX IF NOT EXISTS "doujs_visibility" ON "Doujs" ("visibility");');
    } catch (error) {
      console.log("Error creating indexes:", error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    // Drop foreign key constraints first
    try {
      // Drop constraints from DoujCategories table
      await queryInterface.sequelize.query('ALTER TABLE IF EXISTS "DoujCategories" DROP CONSTRAINT IF EXISTS "DoujCategories_doujId_fkey";');

      // Drop constraints from Categories table
      await queryInterface.sequelize.query('ALTER TABLE IF EXISTS "Categories" DROP CONSTRAINT IF EXISTS "Categories_category_fkey";');

      // Now we can safely drop the table
      await queryInterface.dropTable("Doujs");

      // Try to drop the enum type
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Doujs_visibility";');
    } catch (error) {
      console.log("Error in down migration:", error.message);
    }
  }
};

export default migration;
