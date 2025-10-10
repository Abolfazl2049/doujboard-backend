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

    // Add indexes for foreign keys and frequently queried fields
    await queryInterface.addIndex("Doujs", ["category"]);
    await queryInterface.addIndex("Doujs", ["user"]);
    await queryInterface.addIndex("Doujs", ["visibility"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Doujs");
    // Try to drop the enum type
    try {
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Doujs_visibility";');
    } catch (error) {
      console.log("Error dropping enum type:", error.message);
    }
  }
};

export default migration;
