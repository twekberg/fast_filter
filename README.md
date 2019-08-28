fast_filter
===========

Fast filtering for when you hare a large amount of data to display.

Overview
--------

Based on Chris Smith's Lightning Fast Filtering in JavaScript (https://chrissmith.xyz/lightning-fast-filtering-in-javascript/).

Detail
------

After cloning this repo, point your browser to fast.html. The
Javascript and CSS are in the same directory. 

Pagination was added. The following are the pagination options:

  * scroll forward and backward one page
  * scroll to the first or last page
  * scroll to a user-specified page

Scroll icons don't show when they are not applicable.
For example, the backward scrolling icons don't show when one is on
the first page.
The data was changed to make it easier to verify that scrolling is
working properly.

Note that the way this was written only one filtering 'element' is
allowed on a single page. Feel free to change it to allow one or more
on the same page.
