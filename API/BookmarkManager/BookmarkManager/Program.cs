using BookmarkManager.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var myallowspecificorigins = "_myallowspecificorigins";
// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myallowspecificorigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
        });
});


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddDbContext<ContextAPIDBContext>(options => options.UseInMemoryDatabase("BMemoryDatabase"));
builder.Services.AddDbContext<ContextAPIDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("BookmarkManagerConnectionString")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors(myallowspecificorigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
