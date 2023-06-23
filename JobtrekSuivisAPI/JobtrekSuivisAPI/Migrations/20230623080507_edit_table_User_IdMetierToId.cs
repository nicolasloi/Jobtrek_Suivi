using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobtrekSuivisAPI.Migrations
{
    /// <inheritdoc />
    public partial class edit_table_User_IdMetierToId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdMetier",
                table: "Metiers",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Metiers",
                newName: "IdMetier");
        }
    }
}
