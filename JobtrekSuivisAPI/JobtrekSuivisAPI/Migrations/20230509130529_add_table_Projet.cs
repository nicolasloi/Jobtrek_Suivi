using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace JobtrekSuivisAPI.Migrations
{
    /// <inheritdoc />
    public partial class add_table_Projet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Projets",
                columns: table => new
                {
                    IdProjet = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom_projet = table.Column<string>(type: "text", nullable: false),
                    desc_projet = table.Column<string>(type: "text", nullable: false),
                    time_estimed = table.Column<int>(type: "integer", nullable: false),
                    MetierId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projets", x => x.IdProjet);
                    table.ForeignKey(
                        name: "FK_Projets_Metiers_MetierId",
                        column: x => x.MetierId,
                        principalTable: "Metiers",
                        principalColumn: "IdMetier",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Projets_MetierId",
                table: "Projets",
                column: "MetierId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Projets");
        }
    }
}
