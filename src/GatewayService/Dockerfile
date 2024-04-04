FROM mcr.microsoft.com/sdk:8.0 AS build
WORKDIR /app
EXPOSE 80

COPY Carau.sln Carau.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/IdntityService/IdntityService.csproj src/IdntityService/IdntityService.csproj

RUN dotnet restore Carau.sln

COPY src/GatewayService/. src/GatewayService/
COPY src/Contracts/. src/Contracts/
WORKDIR /app/src/GatewayService
RUN dotnet publish -c Release -o /app/src/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT ["dotnet", "GatewayService.dll"]