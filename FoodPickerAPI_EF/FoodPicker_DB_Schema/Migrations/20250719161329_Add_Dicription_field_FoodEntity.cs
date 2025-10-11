using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodPickerDB_Schema.Migrations
{
    /// <inheritdoc />
    public partial class Add_Dicription_field_FoodEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Foods",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Foods");
        }
    }
}
