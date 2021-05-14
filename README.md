# Lab 5: Platform API

CRUD API server made with Express & MongoDB. Complements the client done previously.

Here's the [link](https://condescending-beaver-755764.netlify.app/) to the blogsite.

## What Worked Well

Reading the Mongo/ose documentation really carefully before coding helped a ton. I also did the short assignment from earlier in the week in a huge rush, so going back and rereading its instructions helped catch me up to speed on comprehension for this lab.

## What Didn't

I typo'd `findByIdAndUpdate` into `findByIdAndUpdated`. Eugh.

I also had to go back and change a ton of `.id` references into `._id` from Lab 4. I didn't realize I had to do this until I looked closely at the URLs while testing and saw that, each time I clicked on an individual post, I was getting redirected to `/post/undefined` and not the expected `/post/:id`.

## Extra Credit

Not this time. :)

## Screenshots

n/a