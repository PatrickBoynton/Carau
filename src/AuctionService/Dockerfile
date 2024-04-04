FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 80

# Copy csproj and restore as distinct layers.  This will allow us to cache the restore step
COPY Carau.sln Carau.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/Gateway/Gateway.csproj src/Gateway/Gateway.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj

# Restore package dependencies
RUN dotnet restore Carau.sln

# Copy everything else
COPY src/AuctionService src/AuctionService
COPY src/Contracts src/Contracts

WORKDIR /app/src/AuctionService

RUN dotnet publish -c Release -o /app/src/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/src/out ./
ENTRYPOINT ["dotnet", "AuctionService.dll"]

# Build the image
# docker build -f src/AuctionService/Dockerfile -t auction-service .