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
    [Migration("20230509130529_add_table_Projet")]
    partial class add_table_Projet
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Metier", b =>
                {
                    b.Property<int>("IdMetier")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdMetier"));

                    b.Property<string>("nom_metier")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("IdMetier");

                    b.ToTable("Metiers");
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

                    b.Property<int>("time_estimed")
                        .HasColumnType("integer");

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
                    b.Property<int>("IdUser")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("IdUser"));

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
                        .HasColumnType("text");

                    b.Property<int>("year")
                        .HasColumnType("integer");

                    b.HasKey("IdUser");

                    b.HasIndex("MetierId");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
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

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Metier", b =>
                {
                    b.Navigation("Projets");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("JobtrekSuivisAPI.Models.Role", b =>
                {
                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
