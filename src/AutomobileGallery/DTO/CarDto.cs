namespace AutomobileGallery.DTO;

public class CarDto
{
    public Guid CarId { get; set; }
    public string CarName { get; set; } = string.Empty;
    public string CarDescription { get; set; } = string.Empty;
    public string PreviewImageUrl { get; set; } = string.Empty;
    public string CarModelUrl { get; set; } = string.Empty;
}
