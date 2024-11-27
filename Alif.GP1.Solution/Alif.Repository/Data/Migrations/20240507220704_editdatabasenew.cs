using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Alif.Repository.Data.Migrations
{
    public partial class editdatabasenew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Shelters",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "courses",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Blogs",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Shelters_AppUserId",
                table: "Shelters",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_courses_AppUserId",
                table: "courses",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_AppUserId",
                table: "Blogs",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_AspNetUsers_AppUserId",
                table: "Blogs",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_courses_AspNetUsers_AppUserId",
                table: "courses",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Shelters_AspNetUsers_AppUserId",
                table: "Shelters",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_AspNetUsers_AppUserId",
                table: "Blogs");

            migrationBuilder.DropForeignKey(
                name: "FK_courses_AspNetUsers_AppUserId",
                table: "courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Shelters_AspNetUsers_AppUserId",
                table: "Shelters");

            migrationBuilder.DropIndex(
                name: "IX_Shelters_AppUserId",
                table: "Shelters");

            migrationBuilder.DropIndex(
                name: "IX_courses_AppUserId",
                table: "courses");

            migrationBuilder.DropIndex(
                name: "IX_Blogs_AppUserId",
                table: "Blogs");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Shelters");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "courses");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Blogs");
        }
    }
}
