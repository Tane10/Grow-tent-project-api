import ImageModel, { ImageDocument } from '../schema/image.schema';
import UserModel, { UserDocument } from '../schema/user.schema';

type Collections = 'users' | 'images';
type Models = ImageDocument | UserDocument;

/**
 * Factory function to get a single collection entity
 * @param collection type of entity to build fn for
 */
