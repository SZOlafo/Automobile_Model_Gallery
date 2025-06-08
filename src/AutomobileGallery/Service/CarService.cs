using AutomobileGallery.Data;
using AutomobileGallery.DTO;
using Microsoft.EntityFrameworkCore;

namespace AutomobileGallery.Service;

public interface ICarService
{
    Task<List<CarDto>> GetCarList();
    Task<CarDto?> GetCarById(Guid carId);
}

internal class CarService : ICarService
{
    private readonly AppDbContext _appDbContext;

    public CarService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<CarDto?> GetCarById(Guid carId)
    {
        return await _appDbContext.Cars
            .Where(x => carId.Equals(x.CarId))
            .Select(x => new CarDto
            {
                CarId = x.CarId,
                CarName = x.CarName,
                CarDescription = x.CarDescription,
                CarModelUrl = x.CarModelUrl,
                PreviewImageUrl = x.CarPreviewImageUrl
            })
            .FirstOrDefaultAsync();
    }

    public async Task<List<CarDto>> GetCarList()
    {
        return await _appDbContext.Cars.Select(x => new CarDto
        {
            CarId = x.CarId,
            CarName = x.CarName,
            CarDescription = x.CarDescription,
            CarModelUrl = x.CarModelUrl,
            PreviewImageUrl = x.CarPreviewImageUrl
        }).ToListAsync();
    }
}
