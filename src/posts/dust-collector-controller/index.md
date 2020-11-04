---
title: "Dust Collector Controller"
date: "2018-11-04"
path: "/dust-collector-controller"
directory: "dust-collector-controller"
coverImage: ""
repolink: ""
modellink: ""
attributionlink: ""
excerpt: ""
tags: ["Electronics"]
---

# Summary

My father recently put a dust collection system in his garage shop. I built this automatic dust collector controller to control its operation so he doesn't have to worry about turning it on and off when he uses a tool.

The controller works by constantly monitoring micro switches on all the blast gates in the system. If any switch is found to be open, the dust collection turns on. Once all the gates are closed, the system turns the dust collection off.

Most of the complexity of this circuit and project comes from the need to filter any static noise from the input lines. Reasonably heavy filtering is provided on each input line to smooth out any electrical jitter caused by static from the dust traveling in the dust collection tubes.

The controller also contains a simple latching button for turning the shop air cleaner on and off from the same control panel as well as an RF remote controller for manual remote activation.
