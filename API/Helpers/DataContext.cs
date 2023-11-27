namespace WebApi.Helpers;

using System.Data;
using Dapper;
using Microsoft.Data.Sqlite;

public class DataContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IDbConnection CreateConnection()
    {
        return new SqliteConnection(Configuration.GetConnectionString("WebApiDatabase"));
    }

    public async Task Init()
    {
        using var connection = CreateConnection();
        await _initSnacks();

        async Task _initSnacks()
        {
            var sql = """
                CREATE TABLE IF NOT EXISTS 
                Snacks (
                    Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    Name TEXT NOT NULL,
                    Quantity INTEGER NOT NULL,
                    Cost FLOAT NOT NULL,
                    Status INTEGER NOT NULL
                );
            """;
            await connection.ExecuteAsync(sql);
        }

    }
}