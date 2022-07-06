export enum Remapping {
    "has-issues" = "has_issues",
    "id" = "id",
    "node-id" = "node_id",
    "name" = "name",
    "full-name" = "full_name",
    "private" = "private",
    "owner" = "owner",
    "html-url" = "html_url",
    "description" = "description",
    "fork" = "fork",
    "url" = "url",
    "forks-url" = "forks_url",
    "keys-url" = "keys_url",
    "collaborators-url" = "collaborators_url",
    "teams-url" = "teams_url",
    "hooks-url" = "hooks_url",
    "issue-events-url" = "issue_events_url",
    "events-url" = "events_url",
    "assignees-url" = "assignees_url",
    "branches-url" = "branches_url",
    "tags-url" = "tags_url",
    "blobs-url" = "blobs_url",
    "git-tags-url" = "git_tags_url",
    "git-refs-url" = "git_refs_url",
    "trees-url" = "trees_url",
    "statuses-url" = "statuses_url",
    "languages-url" = "languages_url",
    "stargazers-url" = "stargazers_url",
    "contributors-url" = "contributors_url",
    "subscribers-url" = "subscribers_url",
    "subscription-url" = "subscription_url",
    "commits-url" = "commits_url",
    "git-commits-url" = "git_commits_url",
    "comments-url" = "comments_url",
    "issue-comment-url" = "issue_comment_url",
    "contents-url" = "contents_url",
    "compare-url" = "compare_url",
    "merges-url" = "merges_url",
    "archive-url" = "archive_url",
    "downloads-url" = "downloads_url",
    "issues-url" = "issues_url",
    "pulls-url" = "pulls_url",
    "milestones-url" = "milestones_url",
    "notifications-url" = "notifications_url",
    "labels-url" = "labels_url",
    "releases-url" = "releases_url",
    "deployments-url" = "deployments_url",
    "created-at" = "created_at",
    "updated-at" = "updated_at",
    "pushed-at" = "pushed_at",
    "git-url" = "git_url",
    "ssh-url" = "ssh_url",
    "clone-url" = "clone_url",
    "svn-url" = "svn_url",
    "homepage" = "homepage",
    "size" = "size",
    "stargazers-count" = "stargazers_count",
    "watchers-count" = "watchers_count",
    "language" = "language",
    "has-projects" = "has_projects",
    "has-downloads" = "has_downloads",
    "has-wiki" = "has_wiki",
    "has-pages" = "has_pages",
    "forks-count" = "forks_count",
    "mirror-url" = "mirror_url",
    "archived" = "archived",
    "disabled" = "disabled",
    "open-issues-count" = "open_issues_count",
    "license" = "license",
    "allow-forking" = "allow_forking",
    "is-template" = "is_template",
    "web-commit-signoff-required" = "web_commit_signoff_required",
    "topics" = "topics",
    "visibility" = "visibility",
    "forks" = "forks",
    "open-issues" = "open_issues",
    "watchers" = "watchers",
    "default-branch" = "default_branch",
    "permissions" = "permissions",
}
export declare module Type {
    export interface Owner {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    }

    export interface License {
        key: string;
        name: string;
        spdx_id: string;
        url: string;
        node_id: string;
    }

    export interface Permissions {
        admin: boolean;
        maintain: boolean;
        push: boolean;
        triage: boolean;
        pull: boolean;
    }

    export interface Repository {
        id: number;
        node_id: string;
        name: string;
        full_name: string;
        private: boolean;
        owner: Owner;
        html_url: string;
        description: string;
        fork: boolean;
        url: string;
        forks_url: string;
        keys_url: string;
        collaborators_url: string;
        teams_url: string;
        hooks_url: string;
        issue_events_url: string;
        events_url: string;
        assignees_url: string;
        branches_url: string;
        tags_url: string;
        blobs_url: string;
        git_tags_url: string;
        git_refs_url: string;
        trees_url: string;
        statuses_url: string;
        languages_url: string;
        stargazers_url: string;
        contributors_url: string;
        subscribers_url: string;
        subscription_url: string;
        commits_url: string;
        git_commits_url: string;
        comments_url: string;
        issue_comment_url: string;
        contents_url: string;
        compare_url: string;
        merges_url: string;
        archive_url: string;
        downloads_url: string;
        issues_url: string;
        pulls_url: string;
        milestones_url: string;
        notifications_url: string;
        labels_url: string;
        releases_url: string;
        deployments_url: string;
        created_at: Date;
        updated_at: Date;
        pushed_at: Date;
        git_url: string;
        ssh_url: string;
        clone_url: string;
        svn_url: string;
        homepage?: any;
        size: number;
        stargazers_count: number;
        watchers_count: number;
        language: string;
        has_issues: boolean;
        has_projects: boolean;
        has_downloads: boolean;
        has_wiki: boolean;
        has_pages: boolean;
        forks_count: number;
        mirror_url?: any;
        archived: boolean;
        disabled: boolean;
        open_issues_count: number;
        license: License;
        allow_forking: boolean;
        is_template: boolean;
        web_commit_signoff_required: boolean;
        topics?: string[];
        visibility: string;
        forks: number;
        open_issues: number;
        watchers: number;
        default_branch: string;
        permissions: Permissions;
    }

    export type Remapper = keyof typeof Remapping;

    export type Enumeration = {
        [key in Remapper]: Type.Repository[typeof Remapping[key]]
    }
}
