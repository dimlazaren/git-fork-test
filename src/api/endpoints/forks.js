import { getInstance } from '../tools';

export function getList({ page = 1, perPage = 5, owner, repositoryName }) {
    return getInstance().get(`repos/${ owner }/${ repositoryName }/forks`, {
        params: { page, per_page: perPage },
    });
}

export function getRepo({ owner, repositoryName }) {
    return getInstance().get(`repos/${ owner }/${ repositoryName }`);
}
