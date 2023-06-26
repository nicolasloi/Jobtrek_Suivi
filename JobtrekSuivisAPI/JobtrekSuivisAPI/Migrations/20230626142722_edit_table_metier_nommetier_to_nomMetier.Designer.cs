﻿// <auto-generated />
using System;
using JobtrekSuivisAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace JobtrekSuivisAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230626142722_edit_table_metier_nommetier_to_nomMetier")]
    partial class edit_table_metier_nommetier_to_nomMetier
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Competence", b =>
                {
                    b.Property<int>("IdCompetence")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdCompetence"));

                    b.Property<int>("DomaineId")
                        .HasColumnType("integer");

                    b.Property<string>("desc_competence")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("nom_competence")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("IdCompetence");

                    b.HasIndex("DomaineId");

                    b.ToTable("Competences");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.CompetenceProjet", b =>
                {
                    b.Property<int>("IdCompetenceProjet")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdCompetenceProjet"));

                    b.Property<int>("CompetenceId")
                        .HasColumnType("integer");

                    b.Property<int>("ProjetId")
                        .HasColumnType("integer");

                    b.HasKey("IdCompetenceProjet");

                    b.HasIndex("CompetenceId");

                    b.HasIndex("ProjetId");

                    b.ToTable("CompetenceProjets");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Domaine", b =>
                {
                    b.Property<int>("IdDomaine")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdDomaine"));

                    b.Property<int>("MetierId")
                        .HasColumnType("integer");

                    b.Property<string>("domaine_competence")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("IdDomaine");

                    b.HasIndex("MetierId");

                    b.ToTable("Domaines");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Evaluation", b =>
                {
                    b.Property<int>("IdEvaluation")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdEvaluation"));

                    b.Property<int>("CompetenceId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<int>("UserProjetId")
                        .HasColumnType("integer");

                    b.Property<string>("commentaire_eval")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("note_eval")
                        .HasColumnType("integer");

                    b.HasKey("IdEvaluation");

                    b.HasIndex("CompetenceId");

                    b.HasIndex("UserId");

                    b.HasIndex("UserProjetId");

                    b.ToTable("Evaluations");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Metier", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("NomMetier")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("character varying(75)");

                    b.HasKey("Id");

                    b.ToTable("Metiers");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Module", b =>
                {
                    b.Property<int>("IdModule")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdModule"));

                    b.Property<bool>("lieu_module")
                        .HasColumnType("boolean");

                    b.Property<string>("nom_module")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("IdModule");

                    b.ToTable("Modules");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.ModuleCompetence", b =>
                {
                    b.Property<int>("IdModuleCompetence")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdModuleCompetence"));

                    b.Property<int>("CompetenceId")
                        .HasColumnType("integer");

                    b.Property<int>("ModuleId")
                        .HasColumnType("integer");

                    b.HasKey("IdModuleCompetence");

                    b.HasIndex("CompetenceId");

                    b.HasIndex("ModuleId");

                    b.ToTable("ModuleCompetences");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Projet", b =>
                {
                    b.Property<int>("IdProjet")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdProjet"));

                    b.Property<int>("MetierId")
                        .HasColumnType("integer");

                    b.Property<string>("desc_projet")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("nom_projet")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("time_estimed")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("IdProjet");

                    b.HasIndex("MetierId");

                    b.ToTable("Projets");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Role", b =>
                {
                    b.Property<int>("IdRole")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdRole"));

                    b.Property<string>("nom_role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("IdRole");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.SuperHero", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Place")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("SuperHeroes");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("MetierId")
                        .HasColumnType("integer");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasMaxLength(24)
                        .HasColumnType("character varying(24)");

                    b.Property<int>("year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("MetierId");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.UserProjet", b =>
                {
                    b.Property<int>("IdUserProjet")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdUserProjet"));

                    b.Property<DateTime>("DateCommencement")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DateRendu")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("ProjetId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("IdUserProjet");

                    b.HasIndex("ProjetId");

                    b.HasIndex("UserId");

                    b.ToTable("UserProjets");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Competence", b =>
                {
                    b.HasOne("JobtrekSuivisAPI.Models.Domaine", "Domaine")
                        .WithMany("Competences")
                        .HasForeignKey("DomaineId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Domaine");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.CompetenceProjet", b =>
                {
                    b.HasOne("JobtrekSuivisAPI.Models.Competence", "Competence")
                        .WithMany()
                        .HasForeignKey("CompetenceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("JobtrekSuivisAPI.Models.Projet", "Projet")
                        .WithMany()
                        .HasForeignKey("ProjetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Competence");

                    b.Navigation("Projet");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Domaine", b =>
                {
                    b.HasOne("JobtrekSuivisAPI.Models.Metier", "Metier")
                        .WithMany("Domaines")
                        .HasForeignKey("MetierId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Metier");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Evaluation", b =>
                {
                    b.HasOne("JobtrekSuivisAPI.Models.Competence", "Competence")
                        .WithMany()
                        .HasForeignKey("CompetenceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("JobtrekSuivisAPI.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("JobtrekSuivisAPI.Models.UserProjet", "UserProjet")
                        .WithMany()
                        .HasForeignKey("UserProjetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Competence");

                    b.Navigation("User");

                    b.Navigation("UserProjet");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.ModuleCompetence", b =>
                {
                    b.HasOne("JobtrekSuivisAPI.Models.Competence", "Competence")
                        .WithMany("ModuleCompetences")
                        .HasForeignKey("CompetenceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("JobtrekSuivisAPI.Models.Module", "Module")
                        .WithMany("ModuleCompetences")
                        .HasForeignKey("ModuleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Competence");

                    b.Navigation("Module");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Projet", b =>
                {
                    b.HasOne("JobtrekSuivisAPI.Models.Metier", "Metier")
                        .WithMany("Projets")
                        .HasForeignKey("MetierId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Metier");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.User", b =>
                {
                    b.HasOne("JobtrekSuivisAPI.Models.Metier", "Metier")
                        .WithMany("Users")
                        .HasForeignKey("MetierId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("JobtrekSuivisAPI.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Metier");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.UserProjet", b =>
                {
                    b.HasOne("JobtrekSuivisAPI.Models.Projet", "Projet")
                        .WithMany()
                        .HasForeignKey("ProjetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("JobtrekSuivisAPI.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Projet");

                    b.Navigation("User");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Competence", b =>
                {
                    b.Navigation("ModuleCompetences");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Domaine", b =>
                {
                    b.Navigation("Competences");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Metier", b =>
                {
                    b.Navigation("Domaines");

                    b.Navigation("Projets");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Module", b =>
                {
                    b.Navigation("ModuleCompetences");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Role", b =>
                {
                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
