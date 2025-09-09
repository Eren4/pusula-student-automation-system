using System.ComponentModel.DataAnnotations.Schema;

namespace StudentAutomationSystem.Models;

public class Admin
{
    [Column("admin_id")]
    public int AdminId { get; set; }

    [Column("admin_nickname")]
    public string AdminNickname { get; set; }

    [Column("admin_email")]
    public string AdminEmail { get; set; }

    [Column("admin_password")]
    public string AdminPassword { get; set; }
}