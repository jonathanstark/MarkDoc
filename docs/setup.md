Setup
====

Setting up MarkDoc is easy. All you need to do is put your Markdown files inside the `./docs` directory (you can nest them in any way you like) and then create a `toc.json` file to display the table of contents and link everything together.

The table of contents file will need to be created manually. I toyed with the idea of auto-generating the table of contents based on the files inside the `./docs` directory, but in the end, I decided I wanted a fully client-side viewer with complete control over the order in which documentation pages were listed.

Here's a sample of the `toc.js` file:

    {
      "sections": [
        {
          "title":"Welcome",
          "page":"./docs/welcome.md",
          "contents":[
            {
              "title":"Setup",
              "page":"./docs/setup.md"
            }
          ]
        },
        {
          "title":"ToDos &amp; Limitations",
          "page":"./docs/todos.md",
          "contents": []
        },
        {
          "title":"Support",
          "page":"./docs/support.md",
          "contents": []
        }
      ]
    }

Once you've created your `toc.json` file, place it inside of the `./docs` directory, along with your markdown files.

Links to Markdown files inside of the `./docs` will open inside the viewer.

Need more help? See the [support page](./docs/support.md).
