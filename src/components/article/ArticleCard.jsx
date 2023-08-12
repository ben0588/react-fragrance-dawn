import { memo } from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = memo(({ article }) => {
    return (
        <article className='card  h-100'>
            <div className='product-card-img-container '>
                <Link to={`/article/${article.id}`} className=''>
                    <img
                        src={article.image}
                        className='product-card-img'
                        alt={article.title}
                        style={{ height: `250px`, width: `100%` }}
                    />
                </Link>
            </div>
            <div className='card-body'>
                <h2 className='card-title fs-5'>{article.title}</h2>
                <p className='card-text  fs-7 my-4'>{article.description}</p>
                <time className='card-text text-muted fs-7 mb-2 '>
                    {new Date(article.create_at).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </time>
                <div className='card-text mb-2'>發表於：{article.author}</div>
                <div className='d-flex flex-wrap'>
                    {article?.tag?.map((item) => (
                        <span className='fs-7 text-muted me-2 my-0 ' key={item}>
                            #{item}
                        </span>
                    ))}
                </div>
            </div>
            <div className='card-footer p-0 m-0'>
                <Link to={`/article/${article.id}`} className='btn btn-primary btn-primary-hover w-100 ' role='button'>
                    閱讀更多
                </Link>
            </div>
        </article>
    );
});
export default ArticleCard;
