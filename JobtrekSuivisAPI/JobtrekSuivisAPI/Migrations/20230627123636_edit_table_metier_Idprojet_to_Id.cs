using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobtrekSuivisAPI.Migrations
{
    /// <inheritdoc />
    public partial class edit_table_metier_Idprojet_to_Id : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdProjet",
                table: "Projets",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Projets",
                newName: "IdProjet");
        }
    }
}
