using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobtrekSuivisAPI.Migrations
{
    /// <inheritdoc />
    public partial class edit_table_metier_nommetier_to_nomMetier : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "nom_metier",
                table: "Metiers",
                newName: "NomMetier");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NomMetier",
                table: "Metiers",
                newName: "nom_metier");
        }
    }
}
