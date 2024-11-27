using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

public class ImageAnalysisService : IImageAnalysisService
{
    private readonly ComputerVisionClient _client;

    public ImageAnalysisService(IConfiguration configuration)
    {
        _client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(configuration["AzureVision:SubscriptionKey"]))
        {
            Endpoint = configuration["AzureVision:Endpoint"]
        };
    }

    public async Task<string> AnalyzeImageAsync(Stream imageStream)
    {
        var features = new List<VisualFeatureTypes?> { VisualFeatureTypes.Description };
        var analysis = await _client.AnalyzeImageInStreamAsync(imageStream, features);
        return string.Join(", ", analysis.Description.Captions.Select(c => c.Text));
    }
}
