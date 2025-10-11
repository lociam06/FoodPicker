using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodPickerDB_Schema.Migrations
{
    /// <inheritdoc />
    public partial class createunittableandrelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Unit",
                table: "Recipe_Ingredients");

            migrationBuilder.AddColumn<int>(
                name: "UnitId",
                table: "Recipe_Ingredients",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Units",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UnitName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Units", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_Ingredients_UnitId",
                table: "Recipe_Ingredients",
                column: "UnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipe_Ingredients_Units_UnitId",
                table: "Recipe_Ingredients",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipe_Ingredients_Units_UnitId",
                table: "Recipe_Ingredients");

            migrationBuilder.DropTable(
                name: "Units");

            migrationBuilder.DropIndex(
                name: "IX_Recipe_Ingredients_UnitId",
                table: "Recipe_Ingredients");

            migrationBuilder.DropColumn(
                name: "UnitId",
                table: "Recipe_Ingredients");

            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "Recipe_Ingredients",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
