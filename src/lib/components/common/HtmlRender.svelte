<script lang="ts">
    import sanitizeHtml from 'sanitize-html';

    export let htmlText:string | undefined;

    const sanitizedDescription = htmlText ? sanitizeHtml(htmlText, {
        allowedTags: [ 'b', 'br', 'a'],
        allowedAttributes: {'a': [ 'href' ]}
    }) : "";
</script>

<span>{@html sanitizedDescription}</span>
