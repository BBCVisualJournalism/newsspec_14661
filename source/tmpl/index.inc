<div class="bbc-news-vj-grid-wrapper">
    <div class="bbc-news-vj-grid-wrapper__fluid-inner">
        <h1 class="lookup-title"><%= search_title %></h1>

        <div class="news-vj-browser-support"><%= browser_support_message %></div>
        <form class="news-vj-postcode-lookup" style="visibility: hidden;">

            <label for="news-vj-postcode-lookup__input">
                <%= search_placeholder %>
            </label>

            <div class="news-vj-postcode-lookup__input-container">
                <input type="text" id="news-vj-postcode-lookup__input" class="news-vj-postcode-lookup__input" />
            </div>

            <button class="news-vj-postcode-lookup__button" disabled="disabled">
                <span class="off-screen"><%= search_submit_text %></span>
                <svg class="bbc-news-visual-journalism-icon--search" width="22" height="22" viewBox="0 0 32 32"><path d="M12.99 4c2.4 0 4.6 1 6.4 2.6 3.6 3.6 3.6 9.2 0 12.8-1.6 1.6-4 2.6-6.4 2.6s-4.6-1-6.4-2.6c-1.8-1.8-2.6-4-2.6-6.4s1-4.6 2.6-6.4c1.8-1.6 4-2.6 6.4-2.6m0-4c-3.4 0-6.6 1.2-9.2 3.8-5 5-5 13.4 0 18.4 2.6 2.6 5.8 3.8 9.2 3.8s6.6-1.2 9.2-3.8c5-5 5-13.4 0-18.4-2.6-2.6-5.8-3.8-9.2-3.8z"></path><path d="M31.99 28.4l-3.6 3.6-9-9.2 1.6-1.8 1.6-2"></path></svg>
                <div class="bbc-news-visual-journalism-loading-spinner"></div>
            </button>

            <div class="result">
                <div class="result__vote"></div>
                <div class="result__text"></div>
            </div>

            <span role="status" aria-live="polite" class="news-vj-postcode-lookup__screen-reader-announcement off-screen"></span>
        </form>

    </div>
</div>
