import { Injectable } from '@nestjs/common';
import { RootPostsRepository } from '../../../config/switchers/rootClasses/root.posts.repository';

@Injectable()
export class PostsQueryRepository extends RootPostsRepository {}
