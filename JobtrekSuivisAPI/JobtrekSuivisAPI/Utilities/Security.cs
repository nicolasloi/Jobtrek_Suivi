namespace JobtrekSuivisAPI.Utilities;

using BCryptNet = BCrypt.Net.BCrypt;

public class Security
{
    public static string HashPassword(string password)
    {
        string hashedPassword = BCryptNet.HashPassword(password);
        return hashedPassword;
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    { 
        bool isPasswordValid = BCryptNet.Verify(password, hashedPassword);
        return isPasswordValid;
    }
}