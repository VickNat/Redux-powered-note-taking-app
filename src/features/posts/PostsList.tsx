import {
    selectAllError,
    selectAllStatus,
    selectPostIds
} from "./postsSlice";
import PostExcerpt from "./PostExcerpt";
import { useAppSelector } from "../../app/hooks";

const PostsList = () => {

    const orderedPostIds = useAppSelector(selectPostIds)
    const status = useAppSelector(selectAllStatus)
    const error = useAppSelector(selectAllError)

    let content;

    if (status === 'loading') {
        content = <p>Loading...</p>
    } else if (status === 'succeeded') {
        content = orderedPostIds.map(postId => <PostExcerpt key={postId} postId={postId} />)
    } else if (status === 'failed') {
        content = <p>{error}</p>
    }

    return (
        <section>
            {content}
        </section>
    )
}
export default PostsList