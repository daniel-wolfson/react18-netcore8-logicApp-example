using JobViewsApi.Core;
using JobViewsApi.Filters;
using JobViewsApi.Interfaces;
using JobViewsApi.Middleware;
using JobViewsApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace DataServices
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "client-app/dist";
            });

            services.AddCors(options => options.AddPolicy("ApiCorsPolicy", builder =>
            {
                builder
                    .SetIsOriginAllowed(origin => true)
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            services.AddControllers();
            //.AddNewtonsoftJson(options =>
            //{
            //    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            //    options.UseMemberCasing();
            //})
            //.AddJsonOptions(jsonOptions =>
            //{
            //    jsonOptions.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            //});

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PandoLogic JobApi service", Version = "v1" });
            });

            services
                .AddMvc(options => options.Filters.Add(typeof(ApiExceptionFilter)));

            // logic services
            services.AddScoped<IJobDataService, JobDataService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            ApiContext.ServiceProvider = app.ApplicationServices;

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "JobApi service v1"));
            }

            app.UseMiddleware<ApiContextMiddleware>();
            app.UseMiddleware<ApiErrorHandlingMiddleware>();

            //app.UseHttpsRedirection();
            app.UseCors("ApiCorsPolicy");

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "client";

            //    if (env.IsDevelopment())
            //    {
            //        spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
            //        // spa.UseReactDevelopmentServer(npmScript: "start");
            //    }
            //});
        }
    }
}

