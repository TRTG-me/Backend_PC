import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt_guard';
import { CreateAssetResponse, GetUserAssetsResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WatchList } from './models/watchlist.model';

@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchListService: WatchlistService){}
    @ApiTags('API')
    @ApiResponse({status: 201, type: CreateAssetResponse})
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset(@Body() assetDTO:WatchListDTO, @Req() request): Promise<CreateAssetResponse>{
        const user = request.user
        return this.watchListService.createAsset(user, assetDTO)
    }

    @ApiTags('API')
    @ApiResponse({status: 201, type: GetUserAssetsResponse})
    @UseGuards(JwtAuthGuard)
    @Post('get-elements')
    getUserAssets(@Req() request): Promise<WatchList[]>{
        const user = request.user
        return this.watchListService.getUserAssets(user.id)
    }

    @ApiTags('API')
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteAsset(@Query('id') assetId:string, @Req() request): Promise<boolean>{
        const {id} = request.user
        return this.watchListService.deleteAsset(id, assetId)
    }
    

}
