title: "API Implementation: Using Idempotent Filter to Prevent Message Twinning"
date: 2015-04-09 13:00:42
tags:
---

When it comes to API implementation, message &#8220;twinning&#8221; is one of those annoying pitfalls that in the worst case scenario, can lead to major problems downstream, such as duplicate orders being submitted etc. However, the client side is often not equipped to prevent duplicate messages from being sent, especially for javascript based user interface calling REST [...]<div class='yarpp-related-rss'>

**Related Posts:**

1.  [Zen and the Art of Mule ESB Implementation ](http://blogs.mulesoft.org/zen-mule-esb-implementation/ "Zen and the Art of Mule ESB Implementation")
2.  [Error Handling in APIKit-based Projects ](http://blogs.mulesoft.org/error-handling-in-apikit-based-projects/ "Error Handling in APIKit-based Projects")
3.  [Calling all API Enthusiasts, The Anypoint Platform for APIs! ](http://blogs.mulesoft.org/new-release-anypoint-platform-apis/ "Calling all API Enthusiasts, The Anypoint Platform for APIs!")
</div><div class="feedflare">
[![](http://feeds.feedburner.com/~ff/muleblog?d=yIl2AUoC8zA)</img>](http://feeds.feedburner.com/~ff/muleblog?a=Ce6sHMAVK78:cQ1teSfXD04:yIl2AUoC8zA) [![](http://feeds.feedburner.com/~ff/muleblog?d=63t7Ie-LG7Y)</img>](http://feeds.feedburner.com/~ff/muleblog?a=Ce6sHMAVK78:cQ1teSfXD04:63t7Ie-LG7Y) [![](http://feeds.feedburner.com/~ff/muleblog?i=Ce6sHMAVK78:cQ1teSfXD04:D7DqB2pKExk)</img>](http://feeds.feedburner.com/~ff/muleblog?a=Ce6sHMAVK78:cQ1teSfXD04:D7DqB2pKExk)
</div>![](http://feeds.feedburner.com/~r/muleblog/~4/Ce6sHMAVK78)