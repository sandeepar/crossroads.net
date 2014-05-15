class TagPage < Jekyll::Page
  def initialize(site, base, dir, tag)
    @site = site
    @base = base
    @dir = dir
    @name = 'index.html'

    self.process(@name)
    self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
    self.data['tag'] = tag

    self.data['title'] = tag
  end
end

class TagPageGenerator < Jekyll::Generator
  safe true

  def generate(site)
    site.tags.each do |tag, pages|
      site.pages << TagPage.new(site, site.source, directory_for_tag(tag), tag)
    end
  end

  def directory_for_tag(tag)
    File.join("tags", tag.downcase.gsub(" ", "_"))
  end

end
