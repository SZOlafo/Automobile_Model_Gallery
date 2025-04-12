using System.ComponentModel.DataAnnotations;

namespace AutomobileGallery.Model;

public class Car
{
    [Key]
    public Guid CarId { get; set; } = Guid.NewGuid();
    public required string CarName { get; set; }
    public string CarDescription { get; set; } = string.Empty;
    public string CarPreviewImageUrl { get; set; } = string.Empty;
    public string CarModelUrl { get; set; } = string.Empty;
}
