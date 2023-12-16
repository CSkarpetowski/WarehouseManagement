using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Text;
using Warehouse.Middlewares;
using WarehouseManagement.Hubs;
using WM.Data.Sql;
using WM.Data.Sql.KlientRepository;
using WM.Data.Sql.Migrations;
using WM.Data.Sql.ProduktRepository;
using WM.Data.Sql.Repositories;
using WM.IData;
using WM.IServices;
using WM.Services;

namespace WarehouseManagement;

public class Startup
{

    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;

    }

    public void ConfigureServices(IServiceCollection services)
    {

        //rejestracja DbContextu, użycie providera MySQL i pobranie danych o bazie z appsettings.json
        services.AddDbContext<WarehouseDbContext>(options => options
            .UseMySQL(Configuration.GetConnectionString("WarehouseDbContext")));
        services.AddTransient<DatabaseSeed>();
        services.AddControllers().AddNewtonsoftJson(options =>
        {
            options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        })
            .AddFluentValidation();
        services.AddScoped<IKlientService, KlientService>();
        services.AddScoped<IKlientRepository, KlientRepository>();
        services.AddScoped<IProduktService, ProduktService>();
        services.AddScoped<IProduktRepository, ProduktRepository>();
        services.AddScoped<IZamowienieService, ZamowienieService>();
        services.AddScoped<IZamowienieRepository, ZamowienieRepository>();
        services.AddScoped<IPracownikService, PracownikService>();
        services.AddScoped<IPracownikRepository, PracownikRepository>();

        //Token JWT --> autoryzacja uzytkownika w React
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = "YourIssuer",
                ValidAudience = "YourAudience",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSecretKey"))
            };
        });


        //Zezwala na request z Reacta na porcie 3000
        services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        }));

        services.AddSignalR();

    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
        {
            var context = serviceScope.ServiceProvider.GetRequiredService<WarehouseDbContext>();
            var databaseSeed = serviceScope.ServiceProvider.GetRequiredService<DatabaseSeed>();
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            databaseSeed.Seed();
        }


        app.UseCors("MyPolicy");
        app.UseMiddleware<ErrorHandlerMiddleware>();
        app.UseRouting();
        app.UseAuthentication();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapHub<NotificationHub>("/productChanged");
            endpoints.MapControllers();
        });


    }


}