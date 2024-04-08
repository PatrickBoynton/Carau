using Duende.IdentityServer.Models;

namespace IdentityService;

public static class Config
{
	public static IEnumerable<IdentityResource> IdentityResources =>
		new IdentityResource[]
			{
				new IdentityResources.OpenId(),
				new IdentityResources.Profile()
			};

	public static IEnumerable<ApiScope> ApiScopes =>
		new ApiScope[]
			{
				new("Carau", "Carau full access")
			};

	public static IEnumerable<Client> Clients =>
		new Client[]
			{
				new()
					{
						ClientId = "postman",
						ClientName = "Postman",
						AllowedScopes = { "openid", "profile", "Carau" },
						RedirectUris = { "https://www.getpostman.com/oauth2/callback" },
						ClientSecrets = new[] { new Secret("NotASecret".Sha256()) },
						AllowedGrantTypes = { GrantTypes.ResourceOwnerPassword.ToString() }
					},
				new()
					{
						ClientId = "nextApp",
						ClientName = "nextApp",
						ClientSecrets = { new Secret("Not a secret!".Sha256()) },
						AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
						RequirePkce = false,
						RedirectUris = { "http://localhost:3000/api/auth/callback/id-server" },
						AllowedScopes = { "openid", "profile", "Carau" },
						// For development purposes only
						AccessTokenLifetime = 3600 * 24 * 30
					}
			};
}