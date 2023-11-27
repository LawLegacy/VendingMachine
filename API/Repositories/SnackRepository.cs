namespace WebApi.Repositories;

using Dapper;
using WebApi.Entities;
using WebApi.Helpers;

public interface ISnackRepository
{
    Task<IEnumerable<Snacks>> GetAll();
    Task<Snacks> GetById(int id);
    Task<IEnumerable<Snacks>> GetByStatus(Status status);
    Task Create(Snacks snack);
    Task Update(Snacks snack);
    Task Delete(int id);
    Task DeleteByStatus(Status status);
}

public class SnackRepository : ISnackRepository
{
    private DataContext _context;

    public SnackRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Snacks>> GetAll()
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT * FROM Snacks
        """;
        return await connection.QueryAsync<Snacks>(sql);
    }

    public async Task<Snacks> GetById(int id)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT * FROM Snacks 
            WHERE Id = @id
        """;
        return await connection.QuerySingleOrDefaultAsync<Snacks>(sql, new { id });
    }

    public async Task<IEnumerable<Snacks>> GetByStatus(Status status)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT * FROM Snacks 
            WHERE Status = @Status
        """;
        return await connection.QueryAsync<Snacks>(sql, new { status });
    }

    public async Task Create(Snacks snack)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            INSERT INTO Snacks (Name, Quantity, Cost, Status)
            VALUES (@Name, @Quantity, @Cost, @Status)
        """;
        await connection.ExecuteAsync(sql, snack);
    }

    public async Task Update(Snacks snack)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            UPDATE Snacks 
            SET Name = @Name,
                Quantity = @Quantity,
                Cost = @Cost,
                Status = @Status
            WHERE Id = @Id
        """;
        await connection.ExecuteAsync(sql, snack);
    }

    public async Task Delete(int id)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            DELETE FROM Snacks 
            WHERE Id = @id
        """;
        await connection.ExecuteAsync(sql, new { id });
    }

    public async Task DeleteByStatus(Status status)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            DELETE FROM Snacks 
            WHERE Status = @status
        """;
        await connection.ExecuteAsync(sql, new { status });
    }
}