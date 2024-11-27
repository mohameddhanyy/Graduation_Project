using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public interface IImageAnalysisService
{
    Task<string> AnalyzeImageAsync(Stream imageStream);
}
