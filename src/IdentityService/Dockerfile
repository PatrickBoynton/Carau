FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 80

COPY Carau.sln Carau.sln
COPY  src/AuthService/AuthService.csproj src/AuthService/AuthService.csproj
COPY src/SearcService/SearchService.csproj src/SearcService/SearchService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/Contrracts/Contrracts.csproj src/Contrracts/Contrracts.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj

RUN dotnet restore Carau.sln

COPY src/IdentityService/ src/IdentityService/
WORKDIR /app/src/IdentityService
RUN dotnet publish -c Release -o /app/src/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/src/out ./
ENTRYPOINT ["dotnet", "IdentityService.dll"]