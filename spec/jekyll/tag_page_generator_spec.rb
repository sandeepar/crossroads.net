require_relative "spec_helper"

describe TagPageGenerator do

  let(:generator) { TagPageGenerator.new }

  describe "#generate" do

    let(:site) { double("Site", tags: {"foo" => [], "bar" => [], "Foo Bar" => [] }, pages: [], source: "app") }
    before do
      generator.generate(site)
    end
    it "generates a page for each tag" do
      expect(site.pages.size).to eq(3)
    end
  end

  describe "#directory_name_for_tag" do
    it "builds directory name goodly" do
      expect(generator.directory_for_tag("Foo Bar")).to eq("tags/foo_bar")
    end
  end

end
