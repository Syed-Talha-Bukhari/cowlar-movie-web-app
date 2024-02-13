export interface IReview {
    _id: string;
    comment: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    movieId: string
}