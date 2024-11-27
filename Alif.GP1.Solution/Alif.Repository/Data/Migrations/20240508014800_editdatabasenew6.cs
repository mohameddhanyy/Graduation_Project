using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Alif.Repository.Data.Migrations
{
    public partial class editdatabasenew6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fosters_AspNetUsers_AppUserId",
                table: "Fosters");

            migrationBuilder.DropIndex(
                name: "IX_Fosters_AppUserId",
                table: "Fosters");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "Fosters",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Fosters",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Fosters_UserId",
                table: "Fosters",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Fosters_AspNetUsers_UserId",
                table: "Fosters",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fosters_AspNetUsers_UserId",
                table: "Fosters");

            migrationBuilder.DropIndex(
                name: "IX_Fosters_UserId",
                table: "Fosters");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Fosters");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "Fosters",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Fosters_AppUserId",
                table: "Fosters",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Fosters_AspNetUsers_AppUserId",
                table: "Fosters",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
