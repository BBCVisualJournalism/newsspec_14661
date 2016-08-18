define([
    'wrapper',
    '../../bower_components/news-vj-postcode-lookup/source/js/lookup',
    '../../bower_components/devbridge-autocomplete/dist/jquery.autocomplete.min',
    'http://www.stage.bbc.co.uk/indepthtoolkit/data-sets/generation_rent/jsonp',
    'vocab'
], function (wrapper, Lookup, _autocomplete, data, vocab) {

    $('.news-vj-browser-support').css('display', 'none');
    $('.news-vj-postcode-lookup').css('visibility', 'visible');

    var $contentWrapper = $('.bbc-news-vj-wrapper');
    var $result = $('.result');
    var $resultVote = $('.result__vote');
    var $resultElt = $('.result__text');

    var currentSelection = {};

    function commifyNumberString(num) {
        // comma separate thousands
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function getFormattedCurrencyString(str, symbol) {
        var currencySymbol = symbol || '£';
        return currencySymbol + commifyNumberString(str);
    }

    function getResultHtml(selection) {
        var resultHtml,
            par1,
            par2,
            par3,
            par4;

        par1 = '<p>In {{area}} the median annual gross salary is {{annual_gross}}, leaving {{monthly_take_home}} a month after tax and National Insurance contributions. Experts recommend spending no more than 30% of this on housing, which would be {{take_home_30}}.</p>';

        // Check for empty data field
        if (selection.mean_studio) {
            par2 = '<p>An average studio flat costs {{mean_studio}} a month.</p>';
        } else {
            par2 = '<p>There was no average rent available for a studio flat.</p>';
        }

        // Check for empty data field
        if (selection.mean_room_share) {
            par3 = '<p>Renting a room in a shared property costs on average {{mean_room_share}} a month.</p>';
        } else {
            par3 = '<p>There was no average rent available for a room in a house or flat share.</p>';
        }

        par4 = '<p>A one-bedroom property costs about {{mean_one_bed}} a month while a two-bedroom home is about {{mean_two_bed}}.</p>';

        resultHtml =    par1 +
                        par2 +
                        par3 + 
                        par4;

        resultHtml = resultHtml.replace('{{area}}', selection.name)
            .replace('{{annual_gross}}', getFormattedCurrencyString(selection.annual_gross))
            .replace('{{monthly_take_home}}', getFormattedCurrencyString(selection.monthly_take_home))
            .replace('{{take_home_30}}', getFormattedCurrencyString(selection.take_home_30))
            .replace('{{mean_one_bed}}', getFormattedCurrencyString(selection.mean_one_bed))
            .replace('{{mean_two_bed}}', getFormattedCurrencyString(selection.mean_two_bed));

        if (selection.mean_studio) {        
            resultHtml = resultHtml.replace('{{mean_studio}}', getFormattedCurrencyString(selection.mean_studio));
        }

        if (selection.mean_room_share) {        
            resultHtml = resultHtml.replace('{{mean_room_share}}', getFormattedCurrencyString(selection.mean_room_share));
        }

        return resultHtml;
    }

    var lookup = new Lookup({
        input: '#news-vj-postcode-lookup__input',
        data:  data,
        vocab: vocab,
        searchForPostcodes: false,
        searchForPartialPostcodes: false,
        onSelect: function (value, data) {
            $contentWrapper.css('padding-bottom', '');
            $result.show();
            $resultVote.text(data.supporting);
            $resultElt.html(getResultHtml(data));
        },
        onSearchComplete: function () {
            var bottomPadding = 0;
            if ($result.is(':hidden')) {
                bottomPadding = $('.autocomplete-suggestions').height() + 18;
            } else {
                bottomPadding = $('.autocomplete-suggestions').height() + 18 - $result.height();
                if (bottomPadding < 18) {
                    bottomPadding = 18;
                }
            }
            $contentWrapper.css('padding-bottom', bottomPadding + 'px');
        },
        onInvalidateSelection: function () {
            $contentWrapper.css('padding-bottom', '');
        }
    });

    wrapper.markPageAsLoaded();

});
