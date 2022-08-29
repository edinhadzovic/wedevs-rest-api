import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Injectable()
export class StoriesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  private createSlug(title: string) {
  }

  create(createStoryDto: Prisma.StoryCreateInput, user: User, slug: string) {
    const {author, ...rest} = createStoryDto
    return this.prisma.story.create({ data: {
      ...rest,
      author: { connect: { id: user.id } },
      slug,
    }});
  }

  findAll() {
    return this.prisma.story.findMany({
      include: {
        author: true,
        _count: { 
          select: { 
            likes: true,
            comments: true
          }
        }
      }
    });
  }

  findOne(slug: string) {
    return this.prisma.story.findUnique({where: {slug}, include: {author: true, comments: true, likes: true}});
  }

  async likeStory(slug: string, userId: string) {
    const story = await this.prisma.story.update({
      where: { slug },
      data: {
        likes: { create: {
          user: { connect: { id: userId } },
        } },
      },
      select: { _count : { select: { likes: true } } },
    })

    return {
      likes: story._count.likes
    }
  }

  update(id: number, updateStoryDto: UpdateStoryDto) {
    return `This action updates a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
