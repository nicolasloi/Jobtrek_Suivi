using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobtrekSuivisAPI.Migrations
{
    /// <inheritdoc />
    public partial class edit_ModuleAndCompetence : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompetenceModule");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CompetenceModule",
                columns: table => new
                {
                    CompetencesIdCompetence = table.Column<int>(type: "integer", nullable: false),
                    ModulesIdModule = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetenceModule", x => new { x.CompetencesIdCompetence, x.ModulesIdModule });
                    table.ForeignKey(
                        name: "FK_CompetenceModule_Competences_CompetencesIdCompetence",
                        column: x => x.CompetencesIdCompetence,
                        principalTable: "Competences",
                        principalColumn: "IdCompetence",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompetenceModule_Modules_ModulesIdModule",
                        column: x => x.ModulesIdModule,
                        principalTable: "Modules",
                        principalColumn: "IdModule",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompetenceModule_ModulesIdModule",
                table: "CompetenceModule",
                column: "ModulesIdModule");
        }
    }
}
