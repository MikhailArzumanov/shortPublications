﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using publicationsApi.Data;

namespace publicationsApi.Migrations{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot{
        protected override void BuildModel(ModelBuilder modelBuilder){
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("publicationsApi.Models.Commentary", b =>{
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("AuthorId")
                        .HasColumnType("integer");

                    b.Property<int?>("PublicationId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("SetTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("PublicationId");

                    b.ToTable("Commentaries");
                });

            modelBuilder.Entity("publicationsApi.Models.Publication", b =>{
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("AuthorId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("SetTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("Publications");
                });

            modelBuilder.Entity("publicationsApi.Models.User", b =>{
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("boolean");

                    b.Property<string>("Login")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.Property<bool>("WasBanned")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("publicationsApi.Models.Commentary", b =>{
                    b.HasOne("publicationsApi.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId");

                    b.HasOne("publicationsApi.Models.Publication", "Publication")
                        .WithMany("Commentaries")
                        .HasForeignKey("PublicationId");

                    b.Navigation("Author");

                    b.Navigation("Publication");
                });

            modelBuilder.Entity("publicationsApi.Models.Publication", b =>{
                    b.HasOne("publicationsApi.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId");

                    b.Navigation("Author");
                });

            modelBuilder.Entity("publicationsApi.Models.Publication", b =>{
                    b.Navigation("Commentaries");
                });
#pragma warning restore 612, 618
        }
    }
}
